import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { IPost } from '../../../../old/lib/types';
import { TranslationPostPreviewCard } from './TranslationPostPreviewCard';

const POST_MOCK: IPost = {
  author: {
    id: 1,
    bio: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus bio',
    avatar: 'https://i.imgur.com/I80W1Q0.png',
    firstName: 'Іван',
    lastName: 'Іванов',
    mainInstitution: {
      city: {
        id: 1,
        name: 'Київ',
      },
      id: 1,
      name: 'Адоніс',
    },
  },
  publishedAt: '11.12.2020',
  createdAt: '11.09.2020',
  title: 'Ultrices eros in cursus',
  directions: [
    {
      id: 1,
      color: 'red',
      name: 'Хірургія',
    },
  ],
  type: {
    id: 1,
    name: 'Стаття',
  },
  preview:
    'Dolor sit amet consectetur adipiscing elit ut aliquam purus preview.',
  content: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 10,
  origins: [
    {
      id: 3,
      name: 'Переклад',
      parameter: null,
    },
  ],
};

beforeEach(() =>
  render(
    <MemoryRouter>
      <TranslationPostPreviewCard post={POST_MOCK} />
    </MemoryRouter>,
  ),
);

describe('TranslationPostPreviewCard', () => {
  it('renders postType', () => {
    expect(screen.getByText('Переклад')).toBeInTheDocument();
  });
  it('renders background image', () => {
    expect(screen.getByTestId('bgImage')).toBeInTheDocument();
  });
  it('renders title', () => {
    expect(screen.getByText('Ultrices eros in cursus')).toBeInTheDocument();
  });
  it('renders author name', () => {
    expect(screen.getByText('Іван Іванов')).toBeInTheDocument();
  });
  it('renders bio', () => {
    expect(
      screen.getByText(
        'Dolor sit amet consectetur adipiscing elit ut aliquam purus bio',
      ),
    ).toBeInTheDocument();
  });
  it('renders preview', () => {
    expect(
      screen.getByText(
        'Dolor sit amet consectetur adipiscing elit ut aliquam purus preview.',
      ),
    ).toBeInTheDocument();
  });
  it('renders creation date', () => {
    expect(screen.getByText('11 грудня')).toBeInTheDocument();
  });
});
