# GitHub CLI

This document provides an overview of a command-line interface (CLI) tool built with Node.js for fetching GitHub user information and repository commits.

## Overview

The GitHub CLI tool allows users to interact with the GitHub API to fetch user details and repository commits. It utilizes the `axios` library for HTTP requests and the `commander` library for command-line argument parsing.

## Usage

After setting up, you can run the CLI tool using:

```bash
node index.js
```
## Commands

1. **Fetch User Info**
   - **Command:** `fetch-username <username>`
   - **Description:** Fetches information about a specified GitHub user.
   
2. **Fetch Repository Commits**
   - **Command:** `get-commits <username> <repo>`
   - **Description:** Fetches commits from a specified repository of a user.

3. **Exit**
   - **Command:** `exit`
   - **Description:** Exits the CLI tool.

