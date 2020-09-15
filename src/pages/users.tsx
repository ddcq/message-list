import React, { ReactElement } from 'react'
import { Text, List, ListItem, Avatar, Grid } from 'react-md'

export default function Users(): ReactElement {
  return (
    <Grid columns={1}>
      <Text type="headline-4">Users</Text>
      <List>
        <ListItem leftAddon={
          <Avatar><img src="https://source.unsplash.com/100x100/?portrait"width="50px" /></Avatar>
        }>
          User name
        </ListItem>
        <ListItem leftAddon={
          <Avatar><img src="https://source.unsplash.com/100x100/?portrait" width="50px"/></Avatar>
        }>
          User name
        </ListItem>
        <ListItem leftAddon={
          <Avatar><img src="https://source.unsplash.com/100x100/?portrait" width="50px" /></Avatar>
        }>
          User name
        </ListItem>
        <ListItem leftAddon={
          <Avatar><img src="https://source.unsplash.com/100x100/?portrait" width="50px" /></Avatar>
        }>
          User name
				</ListItem>
        <ListItem leftAddon={
          <Avatar><img src="https://source.unsplash.com/100x100/?portrait" width="50px" /></Avatar>
        }>
          User name
        </ListItem>
      </List>
    </Grid>
  )
}
