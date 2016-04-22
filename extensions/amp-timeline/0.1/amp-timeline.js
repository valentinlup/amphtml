/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* jslint esnext:true */

import {CSS} from '../../../build/amp-timeline-0.1.css';
import {isLayoutSizeDefined} from '../../../src/layout';
import {assert} from '../../../src/asserts';
/** @const */
const TAG = 'AmpTimeline';

/**
 * The implementation of `amp-timeline` component. See {@link ../amp-timeline.md} for
 * the spec.
 */
export class AmpTimeline extends AMP.BaseElement {

  /** @override */
  isLayoutSupported(layout) {
    return isLayoutSizeDefined(layout);
  }

  /** @override */
  buildCallback() {
    /** @const @private {!NodeList} */

    this.sections_ = this.getRealChildren();
    this.sections_.forEach((section , index) => {
      // Check that there is a section tag defined
      assert(
          section.tagName.toLowerCase() == 'section',
          'The first element in a timeline should be a <section> tag, ' +
          'See https://github.com/ampproject/amphtml/blob/master/extensions/' +
          'amp-timeline/amp-timeline.md. Found in: %s', section);
      const sectionComponents_ = section.children;
      const header = sectionComponents_[0];
      const image = sectionComponents_[1];
      const list = sectionComponents_[2];
      const items = list.children;

      // Check that the timeline has a header
      assert(
          header.tagName.toLowerCase() == 'h1' &&
          header.classList.contains('heading'),
          'The first element in a timeline should be a <h1> tag, ' +
          'See https://github.com/ampproject/amphtml/blob/master/extensions/' +
          'amp-timeline/amp-timeline.md. Found in: %s', this.element);

      // Check that the timeline has an media tag
      assert(
          image.tagName.toLowerCase() == 'amp-img',
          'The second element in a timeline should be an image, ' +
          'See https://github.com/ampproject/amphtml/blob/master/extensions/' +
          'amp-timeline/amp-timeline.md. Found in: %s', this.element);

      // Check the timeline items container
      assert(list.tagName.toLowerCase() == 'ul' &&
             list.classList.contains('timeline'),
             'The third element in a timeline should a list container with class timeline, ' +
             'See https://github.com/ampproject/amphtml/blob/master/extensions/' +
             'amp-timeline/amp-timeline.md. Found in: %s', this.element);

      // Check that there is at least one item in the list
      assert(items.length,
             'The timeline must contain at least one item, ' +
             'See https://github.com/ampproject/amphtml/blob/master/extensions/' +
             'amp-timeline/amp-timeline.md. Found in: %s', this.element);

      // Check that each item of the timeline has a left or right property
      Array.from(items).forEach((item, index) => {
        const card = item.children[0];

        // each item must be a li with class item
        assert(item.tagName.toLowerCase() == 'li' &&
               item.classList.contains('item'),
               'Each item in the timeline must be a <li> tag with class item. Item number: %s, ' +
               'See https://github.com/ampproject/amphtml/blob/master/extensions/' +
               'amp-timeline/amp-timeline.md. Found in: %s', index+1, this.element);

        // each item must be either left or right
        assert(item.classList.contains('left') ||
              item.classList.contains('right'),
              'Each item in the timeline must have either a left or right class. Item number: %s, ' +
              'See https://github.com/ampproject/amphtml/blob/master/extensions/' +
              'amp-timeline/amp-timeline.md. Found in: %s', index+1, this.element);

        // each item must contain only one card element
        assert(item.children.length == 1,
              'Each item in the timeline must contain only one child card element. Item number: %s, ' +
              'See https://github.com/ampproject/amphtml/blob/master/extensions/' +
              'amp-timeline/amp-timeline.md. Found in: %s', index+1, this.element);


        // each item must contain only one card element
        assert(card.tagName.toLowerCase() == 'div' &&
               card.classList.contains('card'),
              'Each item in the timeline must contain a <div> tag with class card. Item number: %s, ' +
              'See https://github.com/ampproject/amphtml/blob/master/extensions/' +
              'amp-timeline/amp-timeline.md. Found in: %s', index+1, this.element);

        const header = card.children[0];
        const media = card.children[1];
        const descriptionContainer = card.children[2];

        // each card must have a header
        assert(header.tagName.toLowerCase() == 'div' &&
               header.classList.contains('content'),
              'Each card header must be defined by a <div> tag with class content. Item number: %s, ' +
              'See https://github.com/ampproject/amphtml/blob/master/extensions/' +
              'amp-timeline/amp-timeline.md. Found in: %s', index+1, this.element);

        // each card must have a media tag
        assert(media.tagName.toLowerCase() == 'div' &&
               media.classList.contains('media'),
              'Each card media must be defined by a <div> tag with class media. Item number: %s, ' +
              'See https://github.com/ampproject/amphtml/blob/master/extensions/' +
              'amp-timeline/amp-timeline.md. Found in: %s', index+1, this.element);

        // each card must have a description container
        assert(descriptionContainer.tagName.toLowerCase() == 'div' &&
               descriptionContainer.classList.contains('content'),
              'Each card description container must be defined by a <div> tag with class content. Item number: %s, ' +
              'See https://github.com/ampproject/amphtml/blob/master/extensions/' +
              'amp-timeline/amp-timeline.md. Found in: %s', index+1, this.element);
      });

    });
  }

}

AMP.registerElement('amp-timeline', AmpTimeline, CSS);
