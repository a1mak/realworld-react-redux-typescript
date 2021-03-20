interface IBannerProps {
  title: string;
  description?: string;
}

/**
 * Displays promo data
 *
 * @param {*} { title, description }
 * @return {*}
 */
const Banner: React.FC<IBannerProps> = ({ title, description }) => {
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
};

export default Banner;
