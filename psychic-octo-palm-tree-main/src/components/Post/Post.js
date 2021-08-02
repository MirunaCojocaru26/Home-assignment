import PropTypes from 'prop-types';
import { Card, makeStyles, Typography } from "@material-ui/core";
import style from '../style'

const useStyles = makeStyles(style);

const Post = ({component}) => {
    const classes = useStyles();

  return <Card className={classes.root}>
        <Typography className={classes.title}>
        {component.id + '. ' + component.title}
        </Typography>

        <Typography variant="body2">
        {component.body}
        </Typography>
    </Card>
}

Post.propTypes ={
    component:PropTypes.object
}

export default Post;
