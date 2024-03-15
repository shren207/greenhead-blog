export const shareToFacebook = (href: string, text: string): void => {
  window.FB.ui({
    method: 'share',
    mobile_iframe: true,
    href,
    quote: text,
  });
};

export const shareToTwitter = (href: string, text: string): void => {
  window.open(
    `https://twitter.com/share?url=${encodeURIComponent(href)}&text=${encodeURIComponent(text)}`,
    'sharer',
    'toolbar=0,status=0,width=626,height=436'
  );
};
