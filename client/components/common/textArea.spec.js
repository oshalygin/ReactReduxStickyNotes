/* eslint-disable no-unused-vars */
import expect from "expect";
import { mount, shallow } from "enzyme";
import TestUtils from "react-addons-test-utils";
import React from "react";
import TextArea from "./textArea.jsx";

describe("<TextArea />", () => {

    const onChange = function () { };
    const props = { onChange, id: "", text: "" };
    it("There exists an textarea in the text area component", () => {

        const wrapper = shallow(<TextArea {...props} />);
        const actual = wrapper.find("textarea").html();
        expect(actual).toNotBe(undefined); //eslint-disable-line no-undefined
    });

    it("The class for the control is 'form-control", () => {
        const expected = "form-control";
        const wrapper = shallow(<TextArea {...props} />);
        const actual = wrapper.find("textarea").props().className;

        expect(actual).toEqual(expected);
    });

});