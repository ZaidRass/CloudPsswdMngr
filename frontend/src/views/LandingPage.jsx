import LandingPageNavBar from "./components/LandingPageNavBar";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  CardFooter,
  Button,
} from "@nextui-org/react";

function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center v-screen">
      <LandingPageNavBar />
      <Card
        isBlurred
        className="border-none bg-gradient-to-r from-primary-500 to-primary-50 dark:bg-default-100/50"
        style={{
          margin: "10rem",
          padding: "10rem",
          animation: "fly-in 1s forwards",
        }}
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div
              className="flex flex-col items-end col-span-6 md:col-span-8"
              style={{ padding: "3rem", animation: "fly-in 1s forwards" }}
            >
              <div className="flex items-end flex-col gap-0">
                <h3 className="font-semibold uppercase text-foreground/65">
                  Rest assured...
                </h3>
                <h1 className="text-xl font-medium mt-2">
                  your data is secure
                  <span className="text-secondary-500">.</span>ly stored
                </h1>
                <p
                  className="text-right text-foreground/70 mt-10"
                  style={{ maxWidth: "30rem" }}
                >
                  With our state of the art, end-to-end encryption technology
                  and high availability servers, we offer the best password
                  management systems out there.
                </p>
              </div>
            </div>
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                shadow="md"
                src="https://nextui.org/images/hero-card-complete.jpeg"
                width="100%"
              />
            </div>
          </div>
        </CardBody>
      </Card>{" "}
      <div
        className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8"
        style={{ padding: "2rem" }}
      >
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              What to read
            </p>
            <h4 className="text-white font-medium text-large">
              Check out our blog posts
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-4.jpeg"
          />
        </Card>
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              going eco
            </p>
            <h4 className="text-white font-medium text-large">
              Learn how we contribute
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-3.jpeg"
          />
        </Card>
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Supercharged
            </p>
            <h4 className="text-white font-medium text-large">
              Our encryption technology
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-2.jpeg"
          />
        </Card>
        <Card
          isFooterBlurred
          className="w-full h-[300px] col-span-12 sm:col-span-5"
        >
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              job opportunities
            </p>
            <h4 className="text-black font-medium text-xl">
              We&apos;re always hiring
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
            src="https://nextui.org/images/card-example-6.jpeg"
          />
          <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
              <p className="text-black text-tiny">Get notified.</p>
            </div>
            <Button
              className="text-tiny"
              color="primary"
              radius="full"
              size="sm"
            >
              Notify Me
            </Button>
          </CardFooter>
        </Card>
        <Card
          isFooterBlurred
          className="w-full h-[300px] col-span-12 sm:col-span-7"
        >
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Your day your way
            </p>
            <h4 className="text-white/90 font-medium text-xl">
              Access anywhere, anytime
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-5.jpeg"
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <Image
                alt="Breathing app icon"
                className="rounded-full w-10 h-11 bg-black"
                src="https://nextui.org/images/breathing-app-icon.jpeg"
              />
              <div className="flex flex-col">
                <p className="text-tiny text-white/60">amen.ly app</p>
                <p className="text-tiny text-white/60">
                  From the comfort of your couch to Elon Musk&apos;s Mars.
                </p>
              </div>
            </div>
            <Button radius="full" size="sm">
              Get App
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default LandingPage;
