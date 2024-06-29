import Link from 'next/link';
import { LinkProps } from 'next/link';
import React from 'react';

interface SmartLinkProps extends LinkProps {
    children: React.ReactNode;
    className?: string;
    target?: string;
}

const isExternalLink = (href: string): boolean => {
  return href.startsWith('http') || href.startsWith('//');
};

const SmartLink = ({ href, children, className, target, ...props }: SmartLinkProps) => {
  const isExternal = isExternalLink(href.toString());

  if (isExternal) {
    return (
      <Link
        href={href.toString()}
        className={className}
        target={target || '_blank'}
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
};

export default SmartLink;