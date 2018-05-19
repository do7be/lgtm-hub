declare module '*.png' {
  const _: string
  export default _
}

declare module '*.svg' {
  import { Component, SVGProps } from 'react';
  class SVGComponent extends Component<SVGProps<SVGElement>> {}
  export = SVGComponent
}

declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module 'react-tippy' {
  import * as React from "react";

  export class Tooltip extends React.Component<TooltipProps> {}

  export function withTooltip<P>(
    component: React.ComponentType<P>,
    options: TooltipProps
  ): JSX.Element;

  type Position =
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  type Trigger = "mouseenter" | "focus" | "click" | "manual";
  type Animation = "shift" | "perspective" | "fade scale" | "none";
  type Size = "small" | "regular" | "big";
  type Theme = "dark" | "light" | "transparent";

  interface TooltipProps {
    title?: string;
    disabled?: boolean;
    open?: boolean;
    useContext?: boolean;
    onRequestClose?: () => void;
    position?: Position;
    trigger?: Trigger;
    tabIndex?: number;
    interactive?: boolean;
    interactiveBorder?: number;
    delay?: number;
    hideDelay?: number;
    animation?: Animation;
    arrow?: boolean;
    arrowSize?: Size;
    animateFill?: boolean;
    duration?: number;
    hideDuration?: number;
    distance?: number;
    offset?: number;
    hideOnClick?: boolean | "persistent";
    multiple?: boolean;
    followCursor?: boolean;
    inertia?: boolean;
    transitionFlip?: boolean;
    popperOptions?: any;
    html?: React.ReactElement<any>;
    unmountHTMLWhenHide?: boolean;
    size?: Size;
    sticky?: boolean;
    stickyDuration?: boolean;
    beforeShown?: () => void;
    shown?: () => void;
    beforeHidden?: () => void;
    hidden?: () => void;
    theme?: Theme;
    className?: string;
    style?: React.CSSProperties;
  }
}

// TODO
declare var io: any
