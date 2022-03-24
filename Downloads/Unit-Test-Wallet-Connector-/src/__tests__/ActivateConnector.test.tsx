
import { render } from "@testing-library/react";
import { ActivateConnector } from '../components/ActivateConnector';
describe("<ActivateConnetor />", () => {
    test("should display a activate connector", async () => {

        const getTestById = (name:any) => render(<ActivateConnector name={name} activate={() => { }} />)
        const linkElement = await getTestById("name")
        expect(linkElement).toBeInTheDocument()
    })
})