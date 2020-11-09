import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

function MovieInfo(props) {
  const { movie } = props;
  const StyledTableCell = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableCell);

  return (
    <div>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">
                {movie.original_title}
              </StyledTableCell>
              <StyledTableCell align="right">Release</StyledTableCell>
              <StyledTableCell align="right">
                {movie.release_date}
              </StyledTableCell>
              <StyledTableCell align="right">revenue</StyledTableCell>
              <StyledTableCell align="right">{movie.revenue}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="right">Vote Count</StyledTableCell>
              <StyledTableCell align="right">
                {movie.vote_count}
              </StyledTableCell>
              <StyledTableCell align="right">Vote Average</StyledTableCell>
              <StyledTableCell align="right" colSpan={3}>
                {movie.vote_average}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="right">Runtime</StyledTableCell>
              <StyledTableCell align="right">{movie.runtime}</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">{movie.status}</StyledTableCell>
              <StyledTableCell align="right">Popularity</StyledTableCell>
              <StyledTableCell align="right">
                {movie.popularity}
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MovieInfo;
