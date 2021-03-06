import React from "react";
import PropTypes from "prop-types";
import "./style";
const style = require("!less-to-json-loader!../../style/vars.less");
import { withTranslation } from "react-i18next";

@withTranslation("metaui-web")
export default class TitleGroup extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    autoFocus: PropTypes.bool,
    renderItem: PropTypes.func,
    t: PropTypes.func,
  };

  render() {
    const { text = this.props.t("分组"), items } = this.props.config;
    if (items.length == 1) {
      return this.renderItem(items[0]);
    }
    return (
      <div className={`${style.prefix}-groups line`}>
        {items.map((it) => {
          return (
            <div key={it.key} className="item">
              <h3>
                {text}
                <span></span>
              </h3>
              <div key={it.key} className="panel">
                {this.props.renderItem(it)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
