import { Card, CardContent } from '@mui/material';

const CategoryTitle = ({name}) => {
    return (
        <Card variant="outlined" style={{ display: 'flex', alignItems: 'center' }}>
            <CardContent style={{ padding: '16px' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {name}
                </div>
            </CardContent>
        </Card>
    )
}

export default CategoryTitle;