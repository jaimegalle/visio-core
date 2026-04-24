"use client";

import { useState } from "react";
import {
  Button,
  Badge,
  Alert,
  Spinner,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Container,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavbarCollapse,
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Nav,
  NavLink,
  Input,
  Textarea,
  Select,
  FormLabel,
  FormText,
  FormCheck,
  InputGroup,
  InputGroupText,
  FloatingLabel,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Toast,
  ToastHeader,
  ToastBody,
  Progress,
  Tooltip,
  Popover,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  DropdownHeader,
  Collapse,
  Offcanvas,
  Carousel,
  CarouselItem,
  CarouselCaption,
  CloseButton,
  useToast,
} from "@/lib/ui";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 border-b border-bs-border pb-2 text-2xl font-bold text-bs-dark">{title}</h2>
      {children}
    </section>
  );
}

const variants = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"] as const;
const outlineVariants = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"] as const;

export default function ShowcasePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [navActive, setNavActive] = useState("home");
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { toasts, addToast, removeToast } = useToast();
  const [progressValue, setProgressValue] = useState(35);

  return (
    <Container breakpoint="xl" className="mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold text-bs-dark">Bootstrap 5.3 Components Showcase</h1>

      <Section title="Typography">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">h1. Heading</h1>
          <h2 className="text-3xl font-bold">h2. Heading</h2>
          <h3 className="text-2xl font-bold">h3. Heading</h3>
          <h4 className="text-xl font-bold">h4. Heading</h4>
          <h5 className="text-lg font-bold">h5. Heading</h5>
          <h6 className="text-base font-bold">h6. Heading</h6>
          <p className="text-lg text-bs-secondary-600">This is a lead paragraph.</p>
          <p>Regular paragraph text with <mark className="bg-bs-warning-100 px-1">highlighted</mark>, <strong>bold</strong>, and <em>italic</em> text.</p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <Button key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {outlineVariants.map((v) => (
              <Button key={v} variant={`outline-${v}`}>Outline {v.charAt(0).toUpperCase() + v.slice(1)}</Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
            <Button active>Active</Button>
            <Button variant="link">Link Button</Button>
          </div>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((v) => (
            <Badge key={v} variant={v}>{v}</Badge>
          ))}
          <Badge variant="primary" pill>Pill Badge</Badge>
          <span className="relative inline-block">
            Inbox <Badge variant="danger">99+</Badge>
          </span>
        </div>
      </Section>

      <Section title="Alerts">
        <div className="space-y-3">
          {variants.map((v) => (
            <Alert key={v} variant={v} dismissible>
              This is a {v} alert — check it out!
            </Alert>
          ))}
        </div>
      </Section>

      <Section title="Spinners">
        <div className="flex flex-wrap items-center gap-4">
          {variants.map((v) => (
            <Spinner key={v} variant={v} />
          ))}
        </div>
        <h3 className="mb-2 mt-4 text-lg font-semibold">Grow Spinners</h3>
        <div className="flex flex-wrap items-center gap-4">
          {variants.map((v) => (
            <Spinner key={v} variant={v} type="grow" />
          ))}
        </div>
        <h3 className="mb-2 mt-4 text-lg font-semibold">Small</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Spinner variant="primary" size="sm" />
          <Spinner variant="primary" type="grow" size="sm" />
        </div>
      </Section>

      <Section title="Cards">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>Featured</CardHeader>
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardText>Some quick example text to build on the card title and make up the bulk of the card content.</CardText>
              <Button variant="primary" size="sm">Go somewhere</Button>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle>Special title treatment</CardTitle>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              <Button variant="primary">Go somewhere</Button>
            </CardBody>
            <CardFooter className="text-xs text-bs-secondary-500">2 days ago</CardFooter>
          </Card>
          <Card className="bg-bs-dark text-white">
            <CardBody>
              <CardTitle className="text-white">Dark card title</CardTitle>
              <CardText className="text-bs-secondary-300">Some quick example text for a dark card.</CardText>
              <Button variant="outline-light">Go somewhere</Button>
            </CardBody>
          </Card>
        </div>
      </Section>

      <Section title="List Group">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ListGroup>
            <ListGroupItem action>An item</ListGroupItem>
            <ListGroupItem action active>Active item</ListGroupItem>
            <ListGroupItem action disabled>Disabled item</ListGroupItem>
            <ListGroupItem action>And another one</ListGroupItem>
          </ListGroup>
          <ListGroup numbered>
            <ListGroupItem variant="primary">Primary</ListGroupItem>
            <ListGroupItem variant="success">Success</ListGroupItem>
            <ListGroupItem variant="danger">Danger</ListGroupItem>
            <ListGroupItem variant="warning">Warning</ListGroupItem>
          </ListGroup>
        </div>
      </Section>

      <Section title="Accordion">
        <Accordion defaultOpen={["1"]}>
          <AccordionItem itemId="1">
            <AccordionHeader itemId="1">Accordion Item #1</AccordionHeader>
            <AccordionBody itemId="1">
              This is the first item body. It is shown by default until the collapse plugin adds the appropriate classes.
            </AccordionBody>
          </AccordionItem>
          <AccordionItem itemId="2">
            <AccordionHeader itemId="2">Accordion Item #2</AccordionHeader>
            <AccordionBody itemId="2">
              This is the second item body. It is hidden by default.
            </AccordionBody>
          </AccordionItem>
          <AccordionItem itemId="3">
            <AccordionHeader itemId="3">Accordion Item #3</AccordionHeader>
            <AccordionBody itemId="3">
              This is the third item body. It is hidden by default.
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section title="Navbar">
        <Navbar variant="light" className="rounded-lg border border-bs-border mb-4">
          <NavbarBrand href="#">Navbar</NavbarBrand>
          <NavbarToggler onToggle={() => setNavbarOpen(!navbarOpen)} />
          <NavbarCollapse isOpen={navbarOpen}>
            <Nav activeKey={navActive} onSelect={setNavActive} className="ml-auto">
              <NavLink eventKey="home">Home</NavLink>
              <NavLink eventKey="features">Features</NavLink>
              <NavLink eventKey="pricing">Pricing</NavLink>
            </Nav>
          </NavbarCollapse>
        </Navbar>
      </Section>

      <Section title="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Library</BreadcrumbItem>
          <BreadcrumbItem active>Data</BreadcrumbItem>
        </Breadcrumb>
      </Section>

      <Section title="Pagination">
        <Pagination>
          <PaginationItem><PaginationLink>&laquo;</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink active>2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink disabled>&raquo;</PaginationLink></PaginationItem>
        </Pagination>
      </Section>

      <Section title="Nav / Tabs">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-bs-secondary-500">Tabs</h3>
            <Nav variant="tabs" activeKey={navActive} onSelect={setNavActive}>
              <NavLink eventKey="home">Active</NavLink>
              <NavLink eventKey="link">Link</NavLink>
              <NavLink eventKey="disabled" onClick={() => {}}>Disabled</NavLink>
            </Nav>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-bs-secondary-500">Pills</h3>
            <Nav variant="pills" activeKey={navActive} onSelect={setNavActive}>
              <NavLink eventKey="home">Active</NavLink>
              <NavLink eventKey="link">Link</NavLink>
              <NavLink eventKey="disabled" onClick={() => {}}>Disabled</NavLink>
            </Nav>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-bs-secondary-500">Vertical</h3>
            <Nav vertical activeKey={navActive} onSelect={setNavActive}>
              <NavLink eventKey="home">Active</NavLink>
              <NavLink eventKey="link">Link</NavLink>
              <NavLink eventKey="disabled" onClick={() => {}}>Disabled</NavLink>
            </Nav>
          </div>
        </div>
      </Section>

      <Section title="Forms">
        <div className="max-w-lg space-y-4">
          <div>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input id="email" type="email" placeholder="name@example.com" />
            <FormText>We&apos;ll never share your email.</FormText>
          </div>
          <div>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" placeholder="Password" isInvalid />
          </div>
          <div>
            <FormLabel htmlFor="select">Example select</FormLabel>
            <Select id="select">
              <option>Open this select menu</option>
              <option>One</option>
              <option>Two</option>
              <option>Three</option>
            </Select>
          </div>
          <div>
            <FormLabel htmlFor="textarea">Example textarea</FormLabel>
            <Textarea id="textarea" placeholder="Your message..." isValid />
          </div>
          <div className="flex flex-col gap-2">
            <FormCheck type="checkbox" label="Default checkbox" />
            <FormCheck type="checkbox" label="Disabled checkbox" disabled />
          </div>
          <div className="flex flex-col gap-2">
            <FormCheck type="radio" name="radio" label="First radio" />
            <FormCheck type="radio" name="radio" label="Second radio" />
          </div>
          <div className="flex items-center gap-4">
            <FormCheck type="switch" label="Default switch" />
            <FormCheck type="switch" label="Checked switch" />
          </div>
          <div>
            <FloatingLabel label="Email address" type="email" />
          </div>
          <div>
            <InputGroup>
              <InputGroupText>@</InputGroupText>
              <Input placeholder="Username" />
            </InputGroup>
          </div>
          <div>
            <InputGroup>
              <Input placeholder="Recipient's username" />
              <InputGroupText>@example.com</InputGroupText>
            </InputGroup>
          </div>
        </div>
      </Section>

      <Section title="Modal">
        <Button onClick={() => setModalOpen(true)}>Launch demo modal</Button>
        <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
          <ModalHeader onClose={() => setModalOpen(false)}>Modal title</ModalHeader>
          <ModalBody>
            <p>Woo-hoo, you&apos;re reading this text in a modal!</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Close</Button>
            <Button onClick={() => setModalOpen(false)}>Save changes</Button>
          </ModalFooter>
        </Modal>
      </Section>

      <Section title="Toast">
        <Button onClick={() => addToast({ title: "Bootstrap", body: "Hello, this is a toast message." })}>
          Show toast
        </Button>
        <div className="mt-4 space-y-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              show
              onClose={() => removeToast(toast.id)}
              autohide
              delay={4000}
            >
              <ToastHeader onClose={() => removeToast(toast.id)}>
                <span className="mr-auto">{toast.title}</span>
                <span className="text-xs text-bs-secondary-400">just now</span>
              </ToastHeader>
              <ToastBody>{toast.body}</ToastBody>
            </Toast>
          ))}
        </div>
      </Section>

      <Section title="Progress">
        <div className="space-y-4 max-w-lg">
          <Progress value={progressValue} label={`${progressValue}%`} />
          <Progress value={25} variant="success" />
          <Progress value={50} variant="info" />
          <Progress value={75} variant="warning" />
          <Progress value={100} variant="danger" striped />
          <Progress value={66} animated />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>-10</Button>
            <Button size="sm" onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>+10</Button>
          </div>
        </div>
      </Section>

      <Section title="Tooltip &amp; Popover">
        <div className="flex flex-wrap gap-4">
          <Tooltip content="Tooltip on top" placement="top">
            <Button variant="outline-secondary">Tooltip top</Button>
          </Tooltip>
          <Tooltip content="Tooltip on right" placement="right">
            <Button variant="outline-secondary">Tooltip right</Button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" placement="bottom">
            <Button variant="outline-secondary">Tooltip bottom</Button>
          </Tooltip>
          <Tooltip content="Tooltip on left" placement="left">
            <Button variant="outline-secondary">Tooltip left</Button>
          </Tooltip>
          <Popover title="Popover title" content="And here's some amazing content. It's very engaging. Right?" placement="top">
            <Button>Click to toggle popover</Button>
          </Popover>
        </div>
      </Section>

      <Section title="Table">
        <Table striped hover bordered responsive>
          <THead>
            <TR>
              <TH>#</TH>
              <TH>First</TH>
              <TH>Last</TH>
              <TH>Handle</TH>
            </TR>
          </THead>
          <TBody>
            <TR><TD>1</TD><TD>Mark</TD><TD>Otto</TD><TD>@mdo</TD></TR>
            <TR><TD>2</TD><TD>Jacob</TD><TD>Thornton</TD><TD>@fat</TD></TR>
            <TR><TD>3</TD><TD colSpan={2}>Larry the Bird</TD><TD>@twitter</TD></TR>
          </TBody>
        </Table>
      </Section>

      <Section title="Dropdown">
        <Dropdown>
          {({ open, toggle, direction }) => (
            <>
              <DropdownToggle
                onToggle={toggle}
                open={open}
                className="rounded bg-bs-secondary text-white hover:bg-bs-secondary-700 px-3 py-1.5 font-medium"
              >
                Dropdown button
              </DropdownToggle>
              <DropdownMenu show={open} direction={direction}>
                <DropdownHeader>Dropdown header</DropdownHeader>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem active>Active action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownDivider />
                <DropdownItem disabled>Disabled item</DropdownItem>
              </DropdownMenu>
            </>
          )}
        </Dropdown>
      </Section>

      <Section title="Collapse">
        <Button
          variant="primary"
          onClick={() => setCollapseOpen(!collapseOpen)}
          aria-expanded={collapseOpen}
          aria-controls="collapseExample"
        >
          Toggle collapse
        </Button>
        <Collapse in={collapseOpen}>
          <Card className="mt-3">
            <CardBody>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </CardBody>
          </Card>
        </Collapse>
      </Section>

      <Section title="Offcanvas">
        <Button onClick={() => setOffcanvasOpen(true)}>Launch offcanvas</Button>
        <Offcanvas show={offcanvasOpen} onClose={() => setOffcanvasOpen(false)}>
          <div>
            <h5 className="mb-3 text-lg font-semibold">Offcanvas Content</h5>
            <p className="text-sm text-bs-secondary-600">
              Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </p>
            <Button variant="primary" className="mt-3" onClick={() => setOffcanvasOpen(false)}>
              Close
            </Button>
          </div>
        </Offcanvas>
      </Section>

      <Section title="Carousel">
        <div className="max-w-2xl">
          <Carousel>
            <CarouselItem>
              <div className="flex h-64 items-center justify-center rounded bg-bs-primary text-white">
                <CarouselCaption>
                  <h5 className="text-lg font-bold">First slide label</h5>
                  <p className="text-sm">Some representative placeholder content.</p>
                </CarouselCaption>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex h-64 items-center justify-center rounded bg-bs-success text-white">
                <CarouselCaption>
                  <h5 className="text-lg font-bold">Second slide label</h5>
                  <p className="text-sm">Some representative placeholder content.</p>
                </CarouselCaption>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex h-64 items-center justify-center rounded bg-bs-danger text-white">
                <CarouselCaption>
                  <h5 className="text-lg font-bold">Third slide label</h5>
                  <p className="text-sm">Some representative placeholder content.</p>
                </CarouselCaption>
              </div>
            </CarouselItem>
          </Carousel>
        </div>
      </Section>

      <Section title="Close Button">
        <div className="flex items-center gap-4">
          <CloseButton />
          <div className="rounded bg-bs-dark p-2">
            <CloseButton variant="white" />
          </div>
        </div>
      </Section>

      <footer className="mt-16 border-t border-bs-border pt-4 text-center text-sm text-bs-secondary-500">
        Bootstrap 5.3 Components emulated in Tailwind CSS v4
      </footer>
    </Container>
  );
}
