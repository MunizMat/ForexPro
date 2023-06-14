import HomeLayout from '../../../../../src/lib/components/home/Layout';
import { render, screen } from '@testing-library/react';

describe('HomeLayout', () => {
  const content = <div>Example content</div>;
  const image = 'example-image.jpg';

  it('should render the content and image', () => {
    render(<HomeLayout content={content} image={image} />);

    const contentElement = screen.getByText('Example content');
    expect(contentElement).toBeInTheDocument();

    const imageElement = screen.getByTestId('home-image');
    expect(imageElement).toHaveAttribute('src', 'example-image.jpg');
    expect(imageElement).toHaveClass('img-fluid');
    expect(imageElement).toHaveClass('rounded');
  });

  it('should render the content and image with correct column sizes', () => {
    render(<HomeLayout content={content} image={image} />);

    const contentCol = screen.getByTestId('content-column');
    expect(contentCol).toHaveClass('col-lg-6');
    expect(contentCol).toHaveClass('col-12');

    const imageCol = screen.getByTestId('image-column');
    expect(imageCol).toHaveClass('col-lg-6');
    expect(imageCol).toHaveClass('col-12');
    expect(imageCol).toHaveClass('mt-4');
    expect(imageCol).toHaveClass('mt-lg-0');
  });
});
