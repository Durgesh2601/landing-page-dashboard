import { Component, ComponentType } from "@/types";

const componentMap: {
  [key in ComponentType]: (content: string) => JSX.Element;
} = {
  Header: (content) => <h2 className="text-xl font-semibold">{content}</h2>,
  TextBlock: (content) => <p>{content}</p>,
  Image: (content) => (
    <img
      height={250}
      width={250}
      src={content}
      alt="image"
      className="rounded-xl"
    />
  ),
  Footer: (content) => <footer>{content}</footer>,
};

const RenderComponent = ({ component }: { component: Component }) => {
  const ComponentRenderer = componentMap[component.type];
  return ComponentRenderer ? ComponentRenderer(component.content) : null;
};

export default RenderComponent;
