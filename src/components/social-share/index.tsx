import { shareToTwitter, shareToFacebook } from 'src/utils/share';
import { FacebookIcon } from './facebook-icon';
import { TwitterIcon } from './twitter-icon';
import type { FC } from 'react';
import './index.scss';

interface SocialShareProps {
  title: string;
  author: string;
}

export const SocialShare: FC<SocialShareProps> = ({ title, author }) => {
  const text = `Recommend on "${title}" written by @${author}`;

  const onClickTwitterIcon = (e: MouseEvent) => {
    e.preventDefault();

    return shareToTwitter(window.location.href, text);
  };

  const onClickFacebookIcon = (e: MouseEvent) => {
    e.preventDefault();
    return shareToFacebook(window.location.href, text);
  };

  return (
    <div className="social-share">
      <FacebookIcon onClick={onClickFacebookIcon} />
      <TwitterIcon onClick={onClickTwitterIcon} />
    </div>
  );
};
