import {Component, React} from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import {getTables} from "../services/TablesServices";
import ListItemIcon from '@mui/material/ListItemIcon';
import ViewColumnSharpIcon from '@mui/icons-material/ViewColumnSharp';
import TableRowsSharpIcon from '@mui/icons-material/TableRowsSharp';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import AddTableModal from "./AddTableModal";

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            tables: [],
            confirmDeleteOpen: false,
            db_name: '',
            openAdd: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleOpenAdd = this.handleOpenAdd.bind(this);
        this.handleAddOpenChange = this.handleAddOpenChange.bind(this);
    }

    async handleClick(db) {
        this.setState((prevState => ({
            open: !prevState.open
        })));
        await this.fetchTables(db);
    }

    async fetchTables(db) {
        let response = await getTables(db);
        if (!response.success) {
            //TODO: show error
        } else
            this.setState({tables: response.data});
    }

    handleOpenAdd() {
        this.setState({openAdd: true});
    }

    handleCreateClose() {
        this.setState({openAdd: false, db_name: ''}
        )
    }

    handleAddOpenChange(open) {
        this.setState({openAdd: open});
    }

    render() {
        return (<>
            {this.state.openAdd ?
                <AddTableModal db={this.props.name} open={this.state.openAdd} onOpenChange={this.handleAddOpenChange}
                               fetchList={() => this.fetchTables(this.props.name)}/> : null}
            <ListItem secondaryAction={<>
                <IconButton edge="end" aria-label="comments" onClick={this.handleOpenAdd}>
                    <AddBoxOutlinedIcon/>
                </IconButton>
                <IconButton edge="end" aria-label="comments" onClick={this.handleOpenAdd}>
                    <DeleteOutlineRoundedIcon/>
                </IconButton>
            </>
            }>
                <ListItemButton onClick={() => this.handleClick(this.props.name)} key={this.props.name}>
                    {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                    <ListItemText primary={this.props.name}/>
                </ListItemButton>
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {this.state.tables.map((table) => (<>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemText primary={table}/>
                            </ListItemButton>
                            <ListItemButton sx={{pl: 8}}>
                                <ListItemIcon>
                                    <ViewColumnSharpIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Columns"/>
                            </ListItemButton>
                            <ListItemButton sx={{pl: 8}}>
                                <ListItemIcon>
                                    <TableRowsSharpIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Rows"/>
                            </ListItemButton></>
                    ))}
                </List>
            </Collapse></>)
    }

}

export default MenuItem;
