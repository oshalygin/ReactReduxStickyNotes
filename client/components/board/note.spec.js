/* eslint-disable no-unused-vars */
import expect from "expect";
import { mount, shallow } from "enzyme";
import { createStore } from "redux";
import rootReducer from "../../reducers/rootReducer";
import TestUtils from "react-addons-test-utils";
import React from "react";
import Note from "./note.jsx";

describe("<Note />", () => {
    const initialState = [];
    const store = createStore(rootReducer, initialState);
    const notes = [
        {
            id: "da9207ef-75a8-46c8-a8f0-eda9ad1d708e",
            text: "Need to pick up the motorcycle from the shop",
            editMode: false,
            centered: true
        },
        {
            id: "da9207ef-75a8-46c8-a8f0-eda9ad1d708d",
            text: "Write some code",
            editMode: true,
            centered: false
        }];
    let props =
        {
            note: notes[0],
            notes,
            store,
            onSave: function () { },
            onEdit: function () { },
            onChange: function () { },
            onRemove: function () { },
            onExpand: function () { }
        };

    it("If the edit mode is set to false, the renderred Note includes (3) button controls", () => {
        const expected = 3;
        const wrapper = mount(
            <Note {...props} />);
        const actual = wrapper.find("button").length;
        expect(actual).toEqual(expected);

    });

    it("If the edit mode is set to true, the renderred Note includes (1) button control", () => {
        const expected = 1;

        props.note = props.notes[1];
        const wrapper = mount(
            <Note {...props} />);
        const actual = wrapper.find("button").length;
        expect(actual).toEqual(expected);

    });

    it("If the note is centered, the text is rotated -180deg on the y axis", () => {
        const expected = "rotateY(-180deg)";

        props.note = props.notes[0];
        const wrapper = mount(
            <Note {...props} />);
        const actual = wrapper.find("p").props().style.transform;
        expect(actual).toEqual(expected);

    });

    it("The text of the note is displayed in the <p> tag", () => {
        const expected = props.notes[0].text;

        props.note = props.notes[0];
        const wrapper = mount(
            <Note {...props} />);
        const actual = wrapper.find("p").props().children;
        expect(actual).toEqual(expected);

    });
});