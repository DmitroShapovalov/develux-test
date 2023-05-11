const axios = require("axios");const FormData = require("form-data");async function getPackageJson(packageName, packageVersion, repoSlug, apiToken) {    const packageJsonUrl = `https://api.bitbucket.org/2.0/repositories/${repoSlug}/src/master/package.json`;    const packageJsonResponse = await axios.get(packageJsonUrl, {        headers: {            'Authorization': apiToken,        }    });    return packageJsonResponse.data;}async function getBranchHash(branchName, repoSlug, apiToken) {    const branchUrl = `https://api.bitbucket.org/2.0/repositories/${repoSlug}/refs/branches/${branchName}`;    const branchResponse = await axios.get(branchUrl, {        headers: {            'Authorization': apiToken,            'Accept': 'application/json',        }    });    return branchResponse.data.target.hash;}async function createNewBranch(branchName, targetBranchHash, repoSlug, apiToken) {    const newBranchUrl = `https://api.bitbucket.org/2.0/repositories/${repoSlug}/refs/branches`;    await axios.post(newBranchUrl, {        name: branchName,        target: {            hash: targetBranchHash        }    }, {        headers: {            'Authorization': apiToken,            'Accept': 'application/json',        }    });}async function openPullRequest(packageName, packageVersion, currentBranchName, newBranchName, repoSlug, apiToken) {    const pullRequestUrl = `https://api.bitbucket.org/2.0/repositories/${repoSlug}/pullrequests`;    const pullRequestBody = {        title: `Update ${packageName} to ${packageVersion}`,        source: {            branch: {                name: newBranchName            }        },        destination: {            branch: {                name: currentBranchName            }        },        description: `Update the ${packageName} dependency to version ${packageVersion}`    };    await axios.post(pullRequestUrl, pullRequestBody, {        headers: {            'Authorization': apiToken,            'Accept': 'application/json',        }    });}async function uploadDependenciesFile(message, updatedPackageJsonString, branch, repoSlug, apiToken) {    const form = new FormData();    form.append('message', message);    form.append('package.json', updatedPackageJsonString);    form.append('branch', branch);    const uploadUrl = `https://api.bitbucket.org/2.0/repositories/${repoSlug}/src`;    const headers = {        ...form.getHeaders(),        'Authorization': apiToken,    }    await axios.post(uploadUrl, form, {headers});}module.exports = {    getPackageJson,    getBranchHash,    createNewBranch,    openPullRequest,    uploadDependenciesFile,}