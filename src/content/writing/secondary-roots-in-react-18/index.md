---
title: "Secondary root elements in React 18"
subtitle: "Managing rendering of secondary root elements in React 18"
date: "2024-09-18T00:00:00.000Z"
post_type: "blog"
tags: "javascript,typescript,testing,jest,react,react testing library,react hooks,software development"
published: true
---

Hey there 👋

Rendering components outside of the main React route is a niche method but it can be quite useful for rendering React components in isolation, outside the main application tree. This can be particularly helpful for things like tooltips, modals, or other elements that need to be rendered at a different level in the DOM hierarchy.

In React 18, the react-dom library was updated with `ReactDOM.render` and `ReactDOM.unmountComponentAtNode` methods being deprecated, meaning that this style of code needed updating.

Finding up-to-date information on implementing this technique proved somewhat difficult, as it's not a standard practice in React. However, the ability to render a component by calling a method is very convenient certain edge cases.

Heres is the code written as a small module:

```typescript
// renderComponentToSecondaryRoot.ts

import { createRoot, Root } from "react-dom/client";

// Module to handle react root management outside of the primary application root
// This is used for rendering components from a void function which is more portable than rendering into a JSX tree
export const secondaryRootMap = new WeakMap<Element, Root>();

export const unmountComponentToSecondaryRoot = (target: Element | null) => {
    if (!target) {
        return;
    }

    secondaryRootMap.get(target)?.unmount();
    secondaryRootMap.delete(target);
};

export const renderComponentToSecondaryRoot = (component: React.ReactNode, target: Element | null) => {
    if (!target) {
        throw new Error("renderComponentToSecondaryRoot: no root element target");
    }

    let root = secondaryRootMap.get(target);

    if (!root) {
        root = createRoot(target);
        secondaryRootMap.set(target, root);
    }

    root.render(component);
};
}
```

And here is the module in action:

```tsx
// Usage
const target = document.querySelector("#my-element")
const MyComponent = () => <div>React component to render in secondary root</div>

renderComponentToSecondaryRoot(<MyComponent />, target)

unmountComponentToSecondaryRoot(target)
```
