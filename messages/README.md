# Localization

In this directory, you will find our translation keys.
They are stored in JSON-documents, which unfortunately do not provide type safety. In the future, we might want to move over to a type safe alternative, but for now this will do just fine.

## Structure

We structure the keys as following (casing is important):

```json
// xx.json

"Group": {
  "translation-key": "value",
  "SubGroup": {
    "translation-key": "value"
  }
}
```

I.e, **groups** are `PascalCased` and **translation keys** are `kebab-cased`. Any **group** can contain a **group**, but a **translation key** _must_ have a group as a parent and can have _no children_.
