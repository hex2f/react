# React 2019

My React boilerplate for 2019, using the new fancy hooks and eveything.

## npm scripts

`npm run dev` Launch dev server on localhost:3000

`npm run build` Build to dist/

## Structure

`@` is a prefix for `/src/` that can be used for importing easily from anywhere. For example, to import a view you do `import ViewName from '@views/ViewName/ViewName.jsx'`.

Routes go in `@views/ViewName` entry file is called the same as the containing folder. Ex. `@views/Home/Home.jsx` with asociated files in the same folder.

Routes are defined in `src/index.js`.

Global states are defined in `@states/stateName`. Example of a state:

```js
import useGlobalState from './useGlobalState'

export default useGlobalState({
  loggedIn: false,
  name: ''
})
```

Components that are used across multiple views should be in `@components` with the same folder structure as in @views.

## Components

We use functions in this house >:(

```jsx
import React, { useState, useEffect } from 'react'

export default function Landing () {
  const [seconds, setSeconds] = useState(0)

  // Same as componentDidMount
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1)
    }, 1000)

    // what you return here will get run on componentWillUnmount
    return () => clearInterval(interval)
  })

  return (
    <div>
      <p>Seconds Passed: {seconds}</p>
    </div>
  )
}
```

## Styling

JS files exporting objects or functions are prefered for styling but you can use both css and sass anywhere by doing `import "./someStylesheet.sass"` for example.

Example of a JS style file:

```js
export const header = (theme) => ({
  background: theme.background,
  color: theme.color,
  flex: 1,
  padding: 24,
  borderRadius: 12
})
```

And to use it in a component:

```jsx
import * as styles from './style.js'

// later...
<div style={styles.header(props.theme)} />
```
