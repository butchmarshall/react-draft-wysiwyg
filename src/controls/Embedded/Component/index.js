/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { stopPropagation } from '../../../utils/common';
import Option from '../../../components/Option';
import styles from './styles.css';

class LayoutComponent extends Component {
  static propTypes: Object = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    translations: PropTypes.object,
    doCollapse: PropTypes.func,
  };

  state: Object = {
    embeddedLink: '',
    height: this.props.config.defaultSize.height,
    width: this.props.config.defaultSize.width,
  };

  componentWillReceiveProps(props) {
    if (this.props.expanded && !props.expanded) {
      const { height, width } = this.props.config.defaultSize;
      this.setState({
        embeddedLink: '',
        height,
        width,
      });
    }
  }

  onChange: Function = (): void => {
    const { onChange } = this.props;
    const { embeddedLink, height, width } = this.state;
    onChange(embeddedLink, height, width);
  };

  updateValue: Function = (event: Object): void => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  rendeEmbeddedLinkModal(): Object {
    const { embeddedLink, height, width } = this.state;
    const { config: { popupClassName }, doCollapse, translations } = this.props;
    return (
      <div
        className={classNames(styles['rdw-embedded-modal'], popupClassName)}
        onClick={stopPropagation}
      >
        <div className={styles["rdw-embedded-modal-header"]}>
          <span className={styles["rdw-embedded-modal-header-option"]}>
            {translations['components.controls.embedded.embeddedlink']}
            <span className={styles["rdw-embedded-modal-header-label"]} />
          </span>
        </div>
        <div className={styles["rdw-embedded-modal-link-section"]}>
          <span className={styles["rdw-embedded-modal-link-input-wrapper"]}>
            <input
              className={styles["rdw-embedded-modal-link-input"]}
              placeholder={translations['components.controls.embedded.enterlink']}
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={embeddedLink}
              name="embeddedLink"
            />
            <span className={styles["rdw-image-mandatory-sign"]}>*</span>
          </span>
          <div className={styles["rdw-embedded-modal-size"]}>
            <span>
              <input
                onChange={this.updateValue}
                onBlur={this.updateValue}
                value={height}
                name="height"
                className={styles["rdw-embedded-modal-size-input"]}
                placeholder="Height"
              />
              <span className={styles["rdw-image-mandatory-sign"]}>*</span>
            </span>
            <span>
              <input
                onChange={this.updateValue}
                onBlur={this.updateValue}
                value={width}
                name="width"
                className={styles["rdw-embedded-modal-size-input"]}
                placeholder="Width"
              />
              <span className={styles["rdw-image-mandatory-sign"]}>*</span>
            </span>
          </div>
        </div>
        <span className={styles["rdw-embedded-modal-btn-section"]}>
          <button
            type="button"
            className={styles["rdw-embedded-modal-btn"]}
            onClick={this.onChange}
            disabled={!embeddedLink || !height || !width}
          >
            {translations['generic.add']}
          </button>
          <button
            type="button"
            className={styles["rdw-embedded-modal-btn"]}
            onClick={doCollapse}
          >
            {translations['generic.cancel']}
          </button>
        </span>
      </div>
    );
  }

  render(): Object {
    const {
      config: { icon, className, title },
      expanded,
      onExpandEvent,
      translations,
    } = this.props;
    return (
      <div
        className={styles["rdw-embedded-wrapper"]}
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-embedded-control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title || translations['components.controls.embedded.embedded']}
        >
          <img
            src={icon}
            alt=""
          />
        </Option>
        {expanded ? this.rendeEmbeddedLinkModal() : undefined}
      </div>
    );
  }
}

export default LayoutComponent;
