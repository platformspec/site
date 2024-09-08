ifndef CONTAINER_IMAGE
CONTAINER_IMAGE := platform-spec-docs
endif

CONTAINER_TAG := 0.1.0

ifndef CONTAINER_RUNTIME
# Use to change to another container runtime, like podman or docker.
CONTAINER_RUNTIME := docker
endif

ifndef VITEPRESS_PORT
VITEPRESS_PORT := 5173
endif

# Inject everything in .env.
include .env
export

all: build

build:
	$(CONTAINER_RUNTIME) build --progress plain -t $(CONTAINER_IMAGE):$(CONTAINER_TAG) .

run: build
	$(CONTAINER_RUNTIME) run --rm -v `pwd`:/app -p 5173:$(VITEPRESS_PORT) $(CONTAINER_IMAGE):$(CONTAINER_TAG)

clean:
	rm .vitepress/cache -rf

