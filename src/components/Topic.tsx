import React, { FC } from 'react';

const Topic: FC = () => {
  return (
    <div className='container'>
      <div className='banner' />
      <Board />
    </div>
  );
};

const Board: FC = () => {
  const posts = [
    {
      username: 'spinkney0',
      timestamp: '2019-07-22 08:35:41',
      content:
        'In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.',
    },
    {
      username: 'hcornu1',
      timestamp: '2018-08-20 12:13:49',
      content:
        'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    },
    {
      username: 'aburrill2',
      timestamp: '2019-06-25 10:08:30',
      content:
        'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    },
    {
      username: 'spitway3',
      timestamp: '2019-06-27 07:13:34',
      content:
        'Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.',
    },
    {
      username: 'jcastanos4',
      timestamp: '2018-12-16 01:28:07',
      content:
        'Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    },
    {
      username: 'ashilstone5',
      timestamp: '2019-06-29 01:08:47',
      content:
        'Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh.',
    },
    {
      username: 'fmacvay6',
      timestamp: '2019-07-04 15:00:53',
      content:
        'Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    },
    {
      username: 'epennycuick7',
      timestamp: '2019-04-09 07:38:03',
      content:
        'Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    },
    {
      username: 'krootham8',
      timestamp: '2018-09-05 03:28:27',
      content:
        'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    },
    {
      username: 'rberndtsson9',
      timestamp: '2019-01-21 04:45:38',
      content:
        'Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.',
    },
  ];
  return (
    <div className='board-container'>
      <div className='board-header'>
        <h1 className='board-title'>👨‍💻topic</h1>
      </div>
      <div className='sort-container' />
      <div className='board'>
        <div className='board-subheader'>
          <span>started by: spinkey0 created: Today 08:35am posts: 11</span>
        </div>
        {posts.map(post => {
          const { username, timestamp, content } = post;
          return (
            <Post username={username} timestamp={timestamp} content={content} />
          );
        })}
        <PostEditor />
      </div>
    </div>
  );
};

interface PostProps {
  username: string;
  timestamp: string;
  content: string;
}

const Post: FC<PostProps> = ({ username, timestamp, content }) => {
  return (
    <div className='post-container'>
      <div className='post-info-container'>
        <span className='post-username'>{username}</span>
        <span className='post-timestamp'>{timestamp}</span>
      </div>
      <div className='post-content-container'>
        <span className='post-content'>{content}</span>
      </div>
      <div className='post-settings' />
    </div>
  );
};

const PostEditor: FC = () => {
  return (
    <div className='post-editor-container'>
      <div
        className='post-editor-textarea'
        contentEditable={true}
        spellCheck={true}
      />
    </div>
  );
};

export default Topic;
