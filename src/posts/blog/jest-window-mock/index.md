---
title: "Mock window events and properties in Jest"
subtitle: "A collection of code snippets to help when mocking window properties in Jest"
date: "2020-04-12T00:00:00.000Z"
post_type: "blog"
tags: "javascript,typescript,testing,jest,react,react testing library,react hooks,software development"
published: true
---

Hey there 👋

It's been a long time since I wrote a post to this blog and recently came across this problem, which will surely come across again so I deemed it _blog-worthy_.

This example, I needed to test a custom hook which tracks the `window`'s `innerWidth` and `innerHeight` and I will be referring to it as `useWindowSize` in this post, heres what it looks like:

```typescript
// useWindowSize.ts

import { useLayoutEffect, useState } from "react"

interface WindowSize {
  width: number
  height: number
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  useLayoutEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", updateSize)

    updateSize()

    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return windowSize
}
```

Hopefully, you'll walk away from reading this article knowing how to test similar components or hooks, you can also blindly copy and paste the code, both are cool!

### Create a customGlobal object

Firstly we use the `global` object in Jest if we want to mock `window` properties. We don't have access to a `window` object as we normally would in the browser.

If you're using plain old JavaScript you can skip this part, but when using TypeScript we'll need to type the window properties we wish to mock!

This first solution is a bit of an ugly workaround, but hey it works 🤷‍♂️and we're still getting value from testing. We can do this by giving `customGlobal` an `any` type.

```typescript
// useWindowSize.test.ts

const customGlobal: any = global
```

If you really wanted to add better types to `customGlobal` we can achieve this by extending `NodeJS.Global` itself.

```typescript
// useWindowSize.test.ts

import Global = NodeJS.Global

interface CustomGlobal extends Global {
  innerWidth?: number
  innerHeight?: number
}

const customGlobal: CustomGlobal = global
```

### Mocking window properties

Now TypeScript is pleased with our `customGlobal` object, we can simply add the properties we wish to mock directly to it.

This is so we can test that `useWindowSize` is correctly reading them from the `window` object.

```typescript
// useWindowSize.test.ts

// ...

describe("hooks/useWindowSize", () => {
  customGlobal.innerWidth = 500
  customGlobal.innerHeight = 900

  //...
})
```

### Firing window events

As you can see in the `useWindowSize` hook above, it listens for `resize` events. We're going to want to test this too.

```typescript
// useWindowSize.test.ts

// ...

describe("hooks/useWindowSize", () => {
  // ..

  it("updates innerWidth and innerHeight values when window resizes", () => {
    // ..

    act(() => {
      customGlobal.innerWidth = 1000
      customGlobal.innerHeight = 1000

      fireEvent(customGlobal, new Event("resize"))
    })
  })
})
```

### Putting this all together

Here is the final test suite testing that `useWindowSize` correctly reads from `window` and updates when a `resize` event happens on `window`.

```typescript
// useWindowSize.test.ts

import { fireEvent } from "@testing-library/react"
import { act, renderHook } from "@testing-library/react-hooks"

import { useWindowSize } from "./useWindowSize"

const customGlobal = global as any

describe("hooks/useWindowSize", () => {
  customGlobal.innerWidth = 500
  customGlobal.innerHeight = 800

  it("reads initial innerWidth and innerHeight values from window", () => {
    const { result } = renderHook(() => useWindowSize())

    expect(result.current.width).toBe(500)
    expect(result.current.height).toBe(800)
  })

  it("updates innerWidth and innerHeight values when window resizes", () => {
    const { result } = renderHook(() => useWindowSize())

    expect(result.current.width).toBe(500)
    expect(result.current.height).toBe(800)

    act(() => {
      customGlobal.innerWidth = 1000
      customGlobal.innerHeight = 1000

      fireEvent(customGlobal, new Event("resize"))
    })

    expect(result.current.width).toBe(1000)
    expect(result.current.height).toBe(1000)
  })
})
```
