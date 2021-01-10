import Delayed from 'react-delayed';

interface DelayRenderProps {
    children : JSX.Element | JSX.Element[];
            //type of 'children' in React TYPESCRIPT
}

function DelayRender({ children }: DelayRenderProps) {
    return (
        <Delayed mounted={true} mountAfter={500} unmountAfter={500}>
            {children}
        </Delayed>
    )
}

export default DelayRender;