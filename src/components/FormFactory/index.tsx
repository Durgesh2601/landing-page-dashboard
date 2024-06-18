import { Component, ComponentType } from "@/types";

const componentMap: {
  [key in ComponentType]: (content: string) => JSX.Element;
} = {
  Header: (content) => <h2 className="text-xl font-semibold">{content}</h2>,
  TextBlock: (content) => <p>{content}</p>,
  Image: (content) => <img src={content} alt="" />,
  Footer: (content) => <footer>{content}</footer>,
};

const RenderComponent = ({ component }: { component: Component }) => {
  const ComponentRenderer = componentMap[component.type];
  return ComponentRenderer ? ComponentRenderer(component.content) : null;
};

export default RenderComponent;
