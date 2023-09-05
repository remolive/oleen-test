This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Please make sure you have node version 16.14.0 or higher to run this project :)

## Usage

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000/calendar](http://localhost:3000/calendar) with your browser to see the result.

## NOTES

- Does not implement the expand slots button
- CSS not fully implemented
- Didn't solve some crash on Firefox due to a react feature, try to use Chrome browser instead
- Need better pratices for react/TS like `useMemo`, due to lack of knoweldge and time 

This part was quiet time-consuming because I never used TypeScript (or any other typing language since a long time).
Also, I didn't used React since many years so some part looks still unefficient to me, I didn't get the usage of the reducer yet for example
I hope it still looks correct to you