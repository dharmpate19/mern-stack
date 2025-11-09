If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

-To use api multiple times we use vite.config.ts in that we create server object and in that we add proxy object with our api end point like '/api' so wherver we use /api in axios it will use this proxy. Here proxy works as middleme between frontend and backend. we add proxy in server object so it works.

-This works like server.proxy and tell vite like hey vite whenever we see /api we do not have to find it in our server we just have to request to other computer

--Lifting up the staes
-When we lift up the state we have to pass the validation check because if no validation check is entered then that after props if we use method that method will fail because reatc is still has the page in memory so we have to validtae when we lift the state up like {porps.forEach()} we have to so {props && props.forEach()}


--Automated Test
-To test we use it() and add callback function and in that callback function we add except().toBe() toBe defines what we wan tour function to be and we add all this in suite called describe in that we add string and all back function and to run the test we run npx vitest we import all this using 'vitest'
-We added vitest.config.ts
-We can direclty render the component in the render to create fake function to test we add vi.fn(). It create fake function for our test we also import this this from vitest.
-This vi.fn() creates fake function because real fnction is connected by backend. This is known as Mock
-To check that our porducts are rendering all things correctly we use screen. screen lets us check he screen or fake web page. To use scree we use expect(screen.getByText().toBeInTheDocument)
-To test image attribute what we do is we add data-testId in image.

-To create fake axios we use vi.mock('axios') what it does is when we import axios it basicaly create fake version of axios not teh real axios
-We import library @testing-libraray/user-event we import userevent from that and then we run eevnt user = userEvent.setup() to setup the event then run user.click but this is time takign process so we use async and await and finally in click we padd sunction that what we want tot do when we lick like from screen get by testid so we have added data-testId to that button it clicks that button. After that we want to expect someting so expect(axios.post) we have already created mock of axios we call axios to have been called with and add url and data and las we call that getCartData so that we can get that cart data.

