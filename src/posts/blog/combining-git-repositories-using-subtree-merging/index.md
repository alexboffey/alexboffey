---
title: "Combining Git repositories with Subtree Merging"
subtitle: "Subtree Merging is a Git feature that allows the merging of multiple repositories while retaining their histories."
date: "2019-01-23T00:00:00.000Z"
post_type: "blog"
tags: "git,subtree merging,software development"
published: true
---

There are multiple tools at our disposal when it comes to combining git repositories, but today were going to be looking at **subtree-merge** and how it can be used to combine multiple repositories into a different single repository while retaining the git histories of each of the combined repositories.

For the rest of this article, I will be referring to the repositories that are being _merged in_ as _target repositories_ and to the repository that will _house the merged repositories_ as the _parent repository_.

### Add target repository as a Git remote

The first thing we need to do is add the target repository as a remote to our parent repository. The -f flag will perform a _git fetch_ at the same time as adding the remote to our parent repository.

```bash
$ git remote add -f some-repo <REPOSITORY_URL>
```

### Merge in history of target repository

In this step you may need to use the `--allow-unrelated-histories` flag as git may not want to combine the history of the repositories without it. Also note the use of the `--no-commit` flag. This allows us to perform some more actions before making the merge commit.

```bash
$ git merge -s ours --no-commit --allow-unrelated-histories some-repo/some-branch
```

### Pull in files from target repository

Here we're essentially taking a copy of all the files in the specified branch of the target repository and putting them into the location in the parent directory specified in the _--prefix_ parameter.

```bash
$ git read-tree --prefix=some-directory/some-repo/ -u some-repo/some-branch
```

### Commit the merge changes

Once we have completed all the prior steps, we should be in _merging state_ with the files of the target repository in the directory that we specified. From here we can commit all of this into our parent repository.

```bash
$ git commit -m "Merge some-repo into some-directory/some-repo/"

```

### Pulling future updates from target repository

One more thing, we can pull in changes from any of the target repository remotes (assuming they're still there) into our parent repository using the following command.

```bash
$ git pull -s subtree some-repo some-branch
```

I'm sure there are many use cases for this tool, however one that stands out is creating a monorepo from multiple existing repositories; especially as the git history for each repository is preserved and that this technique can be repeated to add more _target repositories_ in the future.
