# 📝 Crafting Front-End Formation - Cheat sheet

___

## Summary

1. [Creating Web Component](#1)\
1.1  [How to create a web component ?](#11)\
1.2  [How to pass data to a web components ?](#12)\
1.3  [How to create a custom event and dispatch it ?](#13)

1. [Testing Web component](#2)\
2.1  [How to load my web component ?](#21)\
2.2  [How to access to the DOM of my web component ?](#22)\
2.3  [How to do snapshot test with Jest ?](#23)\
2.4  [How to create a custom event and dispatch it ?](#24)\
2.5  [How to create a stub of a function ?](#25)\
2.6  [How to set attributes to a web component ?](#26)

1. [Utilities & Cheat sheet](#3)\
3.1  [DOM selectors cheat sheet](#31)\
3.2  [Jest cheat sheet](#32)\
3.3  [Functions](#33)\
3.4  [Storybook Example](#34)\
3.5  [Playwrigth cheat sheet](#35)

1. [Exercices Helpers](#4)\
4.1  [Create a Footer - Exercice n°2](#41)\
4.2  [Testing Betting-list - Exercice n°4](#42)

___

## 📗 1. Creating Web component<a id='1'></a>

#### 1.1 How to create a web component ?<a id='11'></a>

```js
/* Create template */
const template = document.createElement('template');
function createTemplate(name: string): string {
    return `
        <div>Hello ${name} !</div>
    `
}
class MyComponent extends CustomHTMLElement {
     constructor() {
        super();

        /* Attach template to shadow DOM */
        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        /* Create template with variable on the first rendering */
        const name = 'Maxime'
        const newTemplate = createTemplate(name)
        this.renderComponent(newTemplate)
    }
}

/* Define tag with 'arl' prefix */
customElements.define('arl-my-component', MyComponent);
```

*Next steps*

- Import your component in `App.ts` with `import 'myPath/myFile'`
- Call your tag `<arl-my-component></arl-my-component>` in the template of your `App.ts`

#### 1.2 How to pass data to a web components ?<a id='12'></a>

```HTML
<!-- /!\ attributes must be in lowercase --> 
<arl-footer is-user-connected="false"></arl-footer>​
```

```js
class MyComponent extends CustomHTMLElement {
    ...

     static get observedAttributes() {
        return ['is-user-connected']
    }

    attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string) {
        // catch any attributes changes
    }
}
```

#### 1.3 How to create a custom event and dispatch it ?<a id='13'></a>

```ts
const objectToPass = { key: 'value' }
const event = new CustomEvent('eventName', { detail: objectToPass }) /* 'detail' is mandatory in customEvent */

window.dispatchEvent(event)
```

___

## 📙 2. Testing Web component<a id='2'></a>

#### 2.1 How to load my web component ?<a id='21'></a>

```ts
class MyComponent extends CustomHTMLElement {}

const myComponent: HTMLElement = render(MyComponent)
```

#### 2.2 How to access to the DOM of my web component ?<a id='22'></a>

```js
// myComponent is a HTMLElement you can access to the DOM with classical js methods
myComponent.shadowRoot.querySelector(...)
```

#### 2.3 How to do snapshot test with Jest ?<a id='23'></a>

```js
expect(...).toMatchSnapshot();
```

#### 2.4 How to spy parameters sended (dispatchEvent) ?<a id='24'></a>

```ts
const spyDispatchEvent = jest.spyOn(window, 'dispatchEvent');
const expectedParameters = (spyDispatchEvent.mock.calls[0][0] as CustomEvent).detail /* First [0] represent the number of calls we're watching, the second [0] represent the number of parameters sended */
expect(expectedBetChoice).toEqual({ ... })
```

#### 2.5 How to create a stub of a function ?<a id='25'></a>

```ts
const stub = { key: 'value' }

jest.mock('../../services', () => ({
  fetchGameOdds: jest.fn().mockResolvedValue(stub)
}))
```

#### 2.6 How to set attributes to a web component ?<a id='26'></a>

```ts
const objectToPass = { key: 'value' }
const myComponent: HTMLElement = render(MyComponent)

/* 'stringify()' is a method from utils/webComponents.ts file */
myComponent.setAttribute('my-prop-key', stringify(objectToPass))
```

___

## 📕 3. Utilities & Cheat sheet<a id='3'></a>

#### 3.1 DOM selectors cheat sheet<a id='31'></a>

##### querySelectorAll

```ts
/* Return an array of requested DOM elements */
myComponent.querySelectorAll(' CSS selectors ')
```

##### querySelector

```ts
/* Return the requested DOM element */
myComponent.querySelector(' CSS selectors ')
```

##### contains

```ts
/* Return true/false if class exists or not in requested element  */
myComponent.classList.contains(' class name')
```

##### click

```ts
/* Simulate a click */
myComponent.click()
```

#### 3.2 Jest cheat sheet<a id='32'></a>

##### toBeTruthy

```ts
/* Check if value exists or is true */
expect(value).toBeTruthy()
```

##### toBeFalsy

```ts
/* Check if value does NOT exist or is false */
expect(value).toBeFalsy()
```

##### toEqual

```ts
/* Check equality with object/array */
expect(value).toEqual(expectedValue)
```

##### toBe

```ts
/* Check equality with literal type */
expect(value).toBe(expectedValue) 
```

##### toContain

```ts
/* Check if value contains a expected value */
expect(value).toContain(expectedValue) 
```

##### toMatchSnapshot

```ts
/* Create or check validity of snapshot */
expect(...).toMatchSnapshot() 
```

#### 3.3 Functions in `utils/webComponent.ts`<a id='33'></a>

##### render

```ts
/* Instanciate a component and launch 'connectedCallback()' method if exists */
const myComponent: HTMLElement = render(MyComponent)
```

##### stringify

```ts
/* Stringify any type of variable in order to pass it as a prop */
myComponent.setAttribute('key-attribute', stringify(object))
```

##### parse

```ts
/* Parse any stringified attribute value in order to manipulate it */
attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    const parsedValue = parse(newValue)
}
```

#### 3.4 Storybook Example<a id='34'></a>

```ts
import './footer'

export default {
    title: 'Components/Footer',
}

export const Default = () => '<arl-footer></arl-footer>'
export const FooterWithConnectedUser = () => '<arl-footer is-user-connected="true"></arl-footer>'
export const FooterWithDisconnectedUser = () => '<arl-footer is-user-connected="false"></arl-footer>'
```

#### 3.5 Playwrigth cheat sheet<a id='35'></a>

```ts
const browser: Browser = await chromium.launch({
    headless: true,
    slowMo: 0,
    devtools: false
})

const context: BrowserContext = await browser.newContext()
const page: Page = await context.newPage()

await myComponent.isBlockDisplayed('tag or CSS selectors')
await input.type('100')
await input.press('Backspace')
await myComponent.getSummaryContent()
```

___

## 📘 4. Exercices Helpers<a id='4'></a>

### 4.1 Create a Footer - Exercice n°2<a id='41'></a>

Update template in fucntion of recieved attribute.

```ts
class Footer extends CustomHTMLElement {
    ...

    static get observedAttributes() {
        return ['is-user-connected']
    }

    attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string) {
        if (attributeName !== 'is-user-connected') {
            return
        }

        this.render(newValue)
    }

    render(isUserConnected?: string) {
        const footerText = (isUserConnected === 'true')
            ? 'Contact | Plan | Deconnexion'
            : 'Contact | Plan | Connexion'

        const newTemplate = createTemplate(footerText)
        this.renderComponent(newTemplate)
    }
}
```

### 4.2 Testing Betting-list - Exercice n°4<a id='42'></a>

Display a list of game odds with calling component `Betting Item`.

```ts
function createTemplate(gameOddsList: GameOdds[]) {
  return `
    <div class="betting-list">
        <h3>Liste des paris - Football</h3>
        ${gameOddsList
      .map((gameOdds: GameOdds) => `<arl-betting-item game-odds='${stringify(gameOdds)}'></arl-betting-item>`)
      .join('')
    }
    </div>
  `
}
```
