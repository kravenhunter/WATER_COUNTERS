import React from 'react';

export const Li = React.memo(
  ({ text, classField }: { text: string; classField?: string }) => {
    return <li className={classField ?? 'list_item'}>{text}</li>;
  }
);
Li.displayName = 'Li';
