import React from 'react'
import Skeleton from 'react-storefront/Skeleton'
import { Grid } from '@material-ui/core'

export default function ProductSkeleton() {
  console.log('showing ProductSkeleton')

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Skeleton style={{ height: 300 }} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Skeleton style={{ flex: 1 }} />
        <Skeleton style={{ flex: 1 }} />
        <Skeleton style={{ flex: 1 }} />
      </Grid>
    </Grid>
  )
}
