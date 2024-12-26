import {
  ButtonInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  InteractionCollector,
  CacheType,
  EmbedBuilder
} from 'discord.js';

import { setting, LanguagesGame, LobbyType } from '../settings/games/settingLobby';
import { config } from "../config";

class Button {
  
  static async createLobbyButtons(gameId: number): Promise<ActionRowBuilder<ButtonBuilder>> {
    return new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`join_${gameId}`)
          .setLabel(setting.buttonjoin.label)
          .setStyle(setting.buttonjoin.style),
        new ButtonBuilder()
          .setCustomId(`info_${gameId}`)
          .setLabel(setting.buttoninfo.label)
          .setStyle(setting.buttoninfo.style),
        new ButtonBuilder()
          .setCustomId(`leave_${gameId}`)
          .setLabel(setting.buttonleave.label)
          .setStyle(setting.buttonleave.style),
      );
  }

  static async addStartButton(row: ActionRowBuilder<ButtonBuilder>, gameId: number): Promise<void> {
    row.addComponents(
      new ButtonBuilder()
        .setCustomId(`start_${gameId}`)
        .setLabel(setting.buttonstart.label)
        .setStyle(setting.buttonstart.style)
    );
  }

  static async disableJoinLeaveButtons(row: ActionRowBuilder<ButtonBuilder>, gameId: number): Promise<void> {
    row.components.forEach(button => {
      if ((button.data as any).custom_id === `join_${gameId}` || (button.data as any).custom_id === `leave_${gameId}`) {
        button.setDisabled(true);
      }
    });
  }

  static async buttonClick(
    collector: InteractionCollector<ButtonInteraction<CacheType>>,
    games: any,
    embed: EmbedBuilder,
    row: ActionRowBuilder<ButtonBuilder>,
    gameinfo: string
  ): Promise<LobbyType | null> {
    return new Promise((resolve) => {
      collector?.on('collect', async (interaction: ButtonInteraction) => {
        const [action, gameId] = interaction.customId.split('_');
        
        switch(action) {
          case 'join':
            if (!games[gameId].users.includes(interaction.user.id)) {
              games[gameId].users.push(interaction.user.id);
              embed.setDescription(`${LanguagesGame.lobbyplaer[config.language]} ${games[gameId].users.length}/${games[gameId].maxPlayers}`);
  
              if (games[gameId].users.length === games[gameId].maxPlayers) {
                await this.disableJoinLeaveButtons(row, Number(gameId));
                await this.addStartButton(row, Number(gameId));
              }
  
              await interaction.update({ embeds: [embed], components: [row] });
            } else {
              await interaction.reply({ content: LanguagesGame.textButtonjoin[config.language], ephemeral: true });
            }
            break;
          case 'info':
            await interaction.reply({ content: gameinfo, ephemeral: true });
            break;
          case 'leave':
            const index = games[gameId].users.indexOf(interaction.user.id);
            if (index > -1) {
              if (interaction.user.id !== games[gameId].creator) {
                games[gameId].users.splice(index, 1);
                embed.setDescription(`Players: ${games[gameId].users.length}/${games[gameId].maxPlayers}`);
                await interaction.update({ embeds: [embed], components: [row] });
              } else {
                await interaction.reply({ content: LanguagesGame.textButtonLeaveCreator[config.language], ephemeral: true });
              }
            } else {
              await interaction.reply({ content: LanguagesGame.textButtonLeave[config.language], ephemeral: true });
            }
            break;
          case 'start':
            if (interaction.user.id === games[gameId].creator) {
              if (setting.textStart.TrueorFalse) await interaction.reply({ content: setting.textStart.text, ephemeral: true });
              collector.stop();
            } else {
              await interaction.reply({ content: LanguagesGame.textButtonStart[config.language], ephemeral: true });
            }
            break;
        }
      });
  
      collector.on('end', (collected, reason) => {
        if (reason !== 'time') {
          resolve(games);
        } else {
          resolve(null);
        }
      });
    });
  }
}

export default Button;