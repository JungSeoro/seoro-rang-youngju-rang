#!/bin/bash
docker run --rm \
	-v ~/.git-credentials:/root/.git-credentials \
	-v ~/.gitconfig:/root/.gitconfig \
	-v ~/.ssh:/root/.ssh \
	-v $(pwd):/root/vol \
	node:12 sh -c "cd ~/vol && npm run deploy"
