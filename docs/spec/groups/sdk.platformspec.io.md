---
outline: deep
---

# API Group: sdk.platformspec.io
The `sdk.platformspec.io` API Group provides programmatic access, automation, and tooling to interact with the Platform Specification.  It ensures that the specification is machine-readable, extensible, and adaptable to different environments and workflows.

By offering APIs, SDKs, validation rules, and transformation utilities, `sdk.platformspec.io` allows platform teams to automate platform operations, integrate with external tools, and enforce best practices through code.  This group ensures that the Platform Specification is not just a static document, but an interactive and extensible framework for managing cloud platforms.

Think of this as an API Group with Kinds that define and aide in integrating with the Platform Specification itself.

## Kinds
| Kind | Description | Status |
| --- | --- | --- |
| [Scaffold](#scaffold) | A definition of an executable action/installable component which can be bound by the PlatformSpec (through `LabelSelectors`).  References a builder that executes a domain specific action. | 🚧&nbsp;In&nbsp;Progress |
| [ServiceProviderInterface](#serviceproviderinterface) | A generalized domain specific interface for a group of similar tools and solutions. | 🚧&nbsp;In&nbsp;Progress |
| [ServiceProviderBinding](#serviceproviderbinding) | An API binding between `ServiceProviderInterface` and it implementing `ServiceProvider` (library). Decides how a PlatformSpec CR is handled by the blueprint. | 🚧&nbsp;In&nbsp;Progress |
| [ServiceProvider](#serviceprovider) | An implementation of an SPI that can be plugged in. Usually cares about translating the PlatformSpec CR into the "language" of the target platform component. | 🚧&nbsp;In&nbsp;Progress |
| [Adapter](#adapter) | Focusses on working with specific existing tooling or API. | 🚧&nbsp;In&nbsp;Progress |
| [Manifest](#manifest) | A composition of configurations for exisiting tools and APIs. Usually utilized by ServiceProviders and their handlers for configuration/execution. | 🚧&nbsp;In&nbsp;Progress |

## Definitions
