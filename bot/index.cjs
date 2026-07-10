require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

async function sendSubmission(data) {
  const channel = await client.channels.fetch(
    process.env.SUBMISSION_CHANNEL_ID
  );

  const embed = new EmbedBuilder()
    .setTitle("📥 New Resource Submission")
    .addFields(
      { name: "Title", value: data.title },
      { name: "Category", value: data.category },
      { name: "Description", value: data.description },
      { name: "Download", value: data.downloadUrl }
    );

  const buttons = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("approve")
      .setLabel("✅ Approve")
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId("deny")
      .setLabel("❌ Deny")
      .setStyle(ButtonStyle.Danger)
  );

  await channel.send({
    embeds: [embed],
    components: [buttons],
  });
}

client.login(process.env.DISCORD_TOKEN);