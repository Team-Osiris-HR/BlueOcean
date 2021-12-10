



<Button className="mx-2" as={Col} variant="primary" size="sm"  onClick={this.handleShow} className="me-2">Categories</Button>

        <Offcanvas show={this.state.showSide} onHide={this.handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Here is a list of all of the categories to chose from
        </Offcanvas.Body>
      </Offcanvas>