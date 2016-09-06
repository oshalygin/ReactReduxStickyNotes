/* eslint-disable no-unused-vars */
import expect from "expect";
import { mount, shallow } from "enzyme";
import TestUtils from "react-addons-test-utils";
import React from "react";
import NewNote from "./newNote.jsx";

describe("<NewNote />", () => {

    it("The root element is a button that exists", () => {
        const expected = "button";
        const notes = [
            {
                id: "da9207ef-75a8-46c8-a8f0-eda9ad1d708e",
                text: "Need to pick up the motorcycle from the shop",
                editMode: false
            },
            {
                id: "da9207ef-75a8-46c8-a8f0-eda9ad1d708d",
                text: "Write some code",
                editMode: false
            }];
        const props = { createNote: function () { } };

        const wrapper = shallow(<NewNote {...props} />);
        const actual = wrapper.find("button").type();
        expect(actual).toEqual(expected);

    });

    it("The default text on a newly created note is 'Enter Note Text'", () => {
        const expected = "Enter Note Text";
        const notes = [
            {
                id: "da9207ef-75a8-46c8-a8f0-eda9ad1d708e",
                text: "Need to pick up the motorcycle from the shop",
                editMode: false
            },
            {
                id: "da9207ef-75a8-46c8-a8f0-eda9ad1d708d",
                text: "Write some code",
                editMode: false
            }];

        const props = {
            createNote: function (noteText) {
                return noteText;
            }
        };

        const wrapper = shallow(<NewNote {...props} />);
        const actual = wrapper.find("button").props().onClick();
        expect(actual).toEqual(expected);

    });
});