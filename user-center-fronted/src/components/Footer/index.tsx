import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import {GITHIB_LINK} from "@/constants";

const links = [
  {
    key: '鱼皮的星球',
    title: '知识星球',
    href: 'https://wx.zsxq.com/dweb2/index/group/51122858222824',
    blankTarget: true,
  },
  {
    key: 'github',
    title: <><GithubOutlined />我的GitHub</>,
    href: GITHIB_LINK,
    blankTarget: true,
  },
  {
    key: '用户中心介绍',
    title: '用户中心',
    href: 'https://bcdh.yuque.com/staff-wpxfif/resource/geuupq',
    blankTarget: true,
  },

];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const defaultMessage = 'fcw';
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      style={{ background: 'none' }}
      links={links}
    />
  );
};


export default Footer;
