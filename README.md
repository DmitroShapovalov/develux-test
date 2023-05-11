# Application purpose:

Application created to update package.json in BitBucket repo and opens a pull request.

# Environment variables:

1. API_TOKEN - Bitbucket repository api token. Provides access to Bitbucket API.
2. REPO_SLUG - part of the url, which leads to specific repository in specific project (for example, 'project/repository').
3. PACKAGE_NAME - name of the package, which should be updated (for example, 'rxjs').
4. PACKAGE_VERSION - version to what package will be updated (for example, '7.10.2'). Set to 'latest' by default.
5. BRANCH_NAME - name of the branch, where package should be updated (for example, 'development'). Set to 'master' by default.

# Example:

API_TOKEN='elrn9238wnfwnf98' REPO_SLUG=test-project/test-repo PACKAGE_NAME=pg PACKAGE_VERSION=8.10.4 BRANCH_NAME=master node index.js

# For setting environment variables on Windows use:
$env:PACKAGE_NAME="pg"
