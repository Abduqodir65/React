import { FirstButton, SecondButton } from "./buttons";
import { Heading } from "./headings";
import { Paragraph, Paragraph2 } from "./paragraphs";
import { SquareComponent } from "./squares";
export function Card1() {
  return (
    <div className="flex flex-col justify-center items-start container shadow p-8">
      <Paragraph>Part 1</Paragraph>
      <Heading>Headline</Heading>
      <Paragraph2>
        Please add your content here. Keep it short and simple. And smile
      </Paragraph2>
      <div className="flex justify-end gap-1 w-[50%]">
        <FirstButton>Button 1</FirstButton>
        <SecondButton>Button 2</SecondButton>
      </div>
    </div>
  );
}



export function Card2() {
    return (
      <div className="flex flex-col justify-center items-center container shadow p-8">
      <div className="grid grid-cols-3 gap-3">
        <SquareComponent />
        <SquareComponent />
        <SquareComponent />
        </div>
        <Heading>Headline</Heading>
        <Paragraph>Please add your content here. Keep it short and simple. And smile</Paragraph>
      </div>
    );
  }