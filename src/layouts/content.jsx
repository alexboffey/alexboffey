import React from "react";
import PropTypes from "prop-types";

const Content = ({ children, isFullWidth }) => {
    const columnsClass = isFullWidth
        ? "g-col-xs-12"
        : "g-col-sm-10 g-col-lg-9 g-col-xl-8";

    return (
        <section className="content__main u-section u-fill-neutral-readable">
            <div className="u-container-lg">
                <div className="u-section u-block grid">
                    <div className={columnsClass}>{children}</div>
                </div>
            </div>
        </section>
    );
};

Content.propTypes = {
    isFullWidth: PropTypes.bool
};

export default Content;
