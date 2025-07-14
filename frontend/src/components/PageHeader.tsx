import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  imagePath?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  breadcrumbs, 
  imagePath = "/assets/images/resources/page-header-img-1.png" 
}) => {
  return (
    <section className="page-header">
      <div
        className="page-header__bg"
        style={{
          backgroundImage:
            "url(/assets/images/shapes/page-header-bg-shape.png)",
        }}
      ></div>
      <div className="page-header__shape-4">
        <img src="/assets/images/shapes/page-header-shape-4.png" alt="" />
      </div>
      <div className="page-header__shape-5">
        <img src="/assets/images/shapes/page-header-shape-5.png" alt="" />
      </div>
      <div className="page-header__social">
        <a href="#">Facebook</a>
        <span>//</span>
        <a href="#">Instagram</a>
        <span>//</span>
        <a href="#">LinkedIn</a>
        <span>//</span>
        <a href="#">Twitter</a>
      </div>
      <div className="container">
        <div className="page-header__inner">
          <div className="page-header__img">
            <img src={imagePath} alt="" />
            <div className="page-header__shape-1">
              <img
                src="/assets/images/shapes/page-header-shape-1.png"
                alt=""
              />
            </div>
            <div className="page-header__shape-2">
              <img
                src="/assets/images/shapes/page-header-shape-2.png"
                alt=""
              />
            </div>
            <div className="page-header__shape-3">
              <img
                src="/assets/images/shapes/page-header-shape-3.png"
                alt=""
              />
            </div>
          </div>
          <h2>{title}</h2>
          <div className="thm-breadcrumb__box">
            <ul className="thm-breadcrumb list-unstyled">
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  <li>
                    {item.path ? (
                      <Link to={item.path}>{item.label}</Link>
                    ) : (
                      item.label
                    )}
                  </li>
                  {index < breadcrumbs.length - 1 && (
                    <li>
                      <span>//</span>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
