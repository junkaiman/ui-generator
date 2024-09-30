# 📐InstaUI: The Ultimate UI Generator in Seconds
[![Daily Merge Dev to Main](https://github.com/junkaiman/ui-generator/actions/workflows/merge-dev-to-main.yml/badge.svg)](https://github.com/junkaiman/ui-generator/actions/workflows/merge-dev-to-main.yml) [![Daily Visitors](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fjunkaiman%2Fui-generator&count_bg=%2379C83D&title_bg=%232E3339&icon=github.svg&icon_color=%23E7E7E7&title=visitors+daily%2Ftotal&edge_flat=false)](https://hits.seeyoufarm.com)


This repo is for the group project of CSCI 2340 - Software Engineering @Brown University

A super cool project that utilizes LLM✨ to generate code for UI components! 

---------
### Contributor Guidelines
👋 **Welcome!** Please follow these guidelines to contribute directly to the repository and ensure smooth collaboration.

#### 0. **Branch Structure Overview**
This repository follows a structured branching strategy with three categories of branches:

- **`main`**: 🚀 The production-ready branch. Code here should always be stable and error-free. Only the CI/CD bot is allowed to merge changes into this branch after passing all validation checks. It is deployed directly to production (e.g., Vercel).
  
- **`dev`**: 🔄 The development integration branch. All contributors merge their work here after review. The `dev` branch must also be stable and pass all tests, serving as a buffer before deploying to `main`.

- **`users/{username}/{feature-name}`**: 🛠️ Individual branches where contributors work on their own features or fixes. Contributors are free to develop here and submit pull requests to the `dev` branch once the feature is complete and tested. The individual branch will get deleted after a successful pull request.

Please adhere to this branch structure for a smooth and organized workflow. 

#### 1. **Clone the Repository**
   - First, clone the repository to your local machine:
     ```bash
     git clone https://github.com/junkaiman/ui-generator.git
     ```

#### 2. **Create a User-Specific Branch**
   - Always work on a separate branch named using the convention `users/{your-username}/{feature-name}`. This keeps your work isolated and easy to review.
     ```bash
     git checkout -b users/{your-username}/{feature-name}
     ```

#### 3. **Develop Your Feature**
   - Implement your feature or fix, making sure to follow the project’s coding standards. 📏
   - Write tests for your code, where applicable, to ensure everything works as expected. ✔️
   - Commit your changes regularly with clear commit messages:
     ```bash
     git commit -m "Description of the change"
     ```

#### 4. **Push Your Branch to the Repository**
   - Push your changes to the main repository under your user-specific branch:
     ```bash
     git push origin users/{your-username}/{feature-name}
     ```

#### 5. **Submit a Pull Request (PR) to `dev` Branch**
   - Once you're done, submit a [pull request (PR)](https://github.com/junkaiman/ui-generator/compare/dev...my-branch?quick_pull=1) from your branch to the **`dev`** branch. ⚠️ Notice it's `dev`, not `main`.
   - Ensure your PR includes:
     - A clear title and description of the changes. 📝
     - Confirmation that all tests pass. ✅
     - Any necessary documentation updates.

#### 6. **Review Process**
   - Your PR will be reviewed by other contributors or maintainers. 🕵️‍♂️ Feedback will be provided, and you may need to make updates based on the suggestions.
   - Be responsive and ready to update your PR as needed. 🔄

#### 7. **Merging Process**
   - Once your PR is approved and all tests pass, it will be merged into the `dev` branch. 📥
   - Periodically, the `dev` branch will be merged into `main` via CI/CD automation. ⚙️

#### 8. **Best Practices**
   - Keep your branch up to date with the latest changes from the `dev` branch:
     ```bash
     git pull origin dev
     ```
   - Always write clean, maintainable code. 🧹
   - Ensure all tests pass before submitting your PR. 🧪

If you have any questions, feel free to reach out to the maintainers or post in the issues section. 💬
