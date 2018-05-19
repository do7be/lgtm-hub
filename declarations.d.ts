declare module '*.svg' {
  import { Component, SVGProps } from 'react';
  class SVGComponent extends Component<SVGProps<SVGElement>> {}
  export = SVGComponent
}

declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}
