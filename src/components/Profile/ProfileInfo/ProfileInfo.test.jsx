import React from 'react'
import ProfileInfo from "./ProfileInfo";
import TestRenderer from 'react-test-renderer';




describe("ProfileInfo component", ()=>{
    test("status from props should be in the state", () =>{
        const component = TestRenderer.create(<ProfileInfo status="text"/>)
        const instance = component.getInstance()
        expect(instance.state.status).toBew("text")
    })

})