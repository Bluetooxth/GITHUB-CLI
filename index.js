#!/usr/bin/env node

const axios = require("axios");
const { program } = require("commander");
const readline = require("readline");

const BaseURL = "https://api.github.com";

async function fetchUSER(user) {
  try {
    const userResponse = await axios.get(`${BaseURL}/users/${user}`);
    console.log(userResponse.data);

    const reposResponse = await axios.get(`${userResponse.data.repos_url}`);
    console.log("\nRepositories:");
    reposResponse.data.forEach((repo, index) => {
      console.log(`${index + 1}. ${repo.name} - ${repo.html_url}`);
    });
  } catch (error) {
    console.error(
      "Error fetching user or repos:",
      error.response ? error.response.data.message : error.message
    );
  }
}

async function fetchCommits(username, repo) {
  try {
    const response = await axios.get(
      `${BaseURL}/repos/${username}/${repo}/commits`
    );
    response.data.forEach((commit) => {
      console.log(
        `Commit: ${commit.commit.message} \nAuthor: ${commit.commit.author.name}\n`
      );
    });
  } catch (error) {
    console.error(
      "Error fetching commits:",
      error.response ? error.response.data.message : error.message
    );
  }
}

function showMenu() {
  console.log("\nAvailable Commands:");
  console.log("  1. fetch-username <username> - Fetch GitHub user info");
  console.log("  2. get-commits <username> <repo> - Fetch repository commits");
  console.log("  3. exit - Exit the CLI tool\n");
}

program.version("1.0.0").description("Github CLI for fetching GitHub commits");

program
  .command("fetch-username <username>")
  .description("Fetch a user info by username")
  .action((username) => {
    fetchUSER(username);
  });

program
  .command("get-commits <username> <repo>")
  .description("Fetch commits from a repo")
  .action((username, repo) => {
    fetchCommits(username, repo);
  });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "GithubCLI> ",
});

function handleUserInput(line) {
  const args = line.trim().split(" ");
  const command = args[0];

  switch (command) {
    case "fetch-username":
      if (args.length === 2) {
        fetchUSER(args[1]);
      } else {
        console.log("Usage: fetch-username <username>");
      }
      break;
    case "get-commits":
      if (args.length === 3) {
        fetchCommits(args[1], args[2]);
      } else {
        console.log("Usage: get-commits <username> <repo>");
      }
      break;
    case "exit":
      rl.close();
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid command");
      showMenu();
  }
}

console.log("Welcome to Github CLI");
showMenu();
rl.prompt();

rl.on("line", (line) => {
  handleUserInput(line);
  rl.prompt();
}).on("close", () => {
  console.log("Goodbye!");
  process.exit(0);
});